from markdown2 import Markdown
import os
from lxml import etree
import shutil   
markdowner = Markdown()

def convert(input_folder, output_folder):
    os.chdir(input_folder)
    for folder in  os.listdir(os.getcwd()):
        os.chdir(input_folder)
        article_number = str(len(os.listdir(output_folder)) + 1)
        output_page_folder = os.path.join(output_folder, article_number)
        print(output_page_folder)
        os.mkdir(output_page_folder)
        os.mkdir(os.path.join(output_page_folder, "media"))
        os.mkdir(os.path.join(output_page_folder, "media", "img"))
        file_list = [X for X in os.listdir(folder) if X[-3:] == ".md"]
        template_html = ""
        with open(os.path.join("..", "template.html"), "r") as template_file:
            template_html = template_file.read()
        for md_file in file_list:
            with open(os.path.join(folder, md_file), "r") as md_content:
                content_html = markdowner.convert(md_content.read())
                html_page = template_html.replace("{{Mon_contenu}}", content_html, 1)
                html_tree = etree.fromstring(html_page)
                img_list = html_tree.xpath("//img")
                for img in img_list:
                    if "http://" not in img.get("src"):
                        image_name = img.get("src").split("/")[-1]
                        shutil.copy(os.path.join(folder, image_name), os.path.join(output_page_folder, "media", "img"))
                        img.set("src", "media/img/{}".format(image_name))
                html_page = str(etree.tostring(html_tree, pretty_print=True), encoding="utf-8")
            os.chdir(output_page_folder)
            with open(os.path.join(md_file[:-3] + ".html"), "w") as html_file:
                html_file.write(html_page)

convert(os.path.join(sys.argv[1]), os.path.join(sys.argv[2]))
# convert(r"C:\Users\Quentin Vandenhove\Desktop\ProjetPython\inputs", r"C:\Users\Quentin Vandenhove\Desktop\ProjetPython\outputs")
