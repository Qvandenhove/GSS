from markdown2 import Markdown
import os
from lxml import etree
import shutil   
import sys
markdowner = Markdown()

def convert(input_folder, output_folder):
    # Récupération du template
    os.chdir("/home/quentin/Documents/GSS")
    # On crée le dossier de destination si il n'existe pas déja
    if os.path.exists(output_folder) is False:
        os.mkdir(output_folder)
    template_html = ""
    with open(os.path.join("template.html"), "r") as template_file:
        template_html = template_file.read()
    os.chdir(input_folder)
    for folder in  os.listdir(os.getcwd()):
        # On se place dans le dossier de travail input
        os.chdir(input_folder)
        article_number = folder
        output_page_folder = os.path.join(output_folder, article_number)
        if os.path.exists(os.path.join(output_page_folder)) is False:
            os.mkdir(os.path.join(output_page_folder))
            os.mkdir(os.path.join(output_page_folder, "media"))
            os.mkdir(os.path.join(output_page_folder, "media", "img"))
        # On parcours les fichiers md
        file_list = [X for X in os.listdir(folder) if X[-3:] == ".md"]
        for md_file in file_list:
            os.chdir(input_folder)
            # on convertit le markdown en html
            with open(os.path.join(folder, md_file), "r") as md_content:
                content_html = markdowner.convert(md_content.read())
                html_page = template_html.replace("{{Mon_contenu}}", content_html, 1)
                html_tree = etree.fromstring(html_page)
                img_list = html_tree.xpath("//img")
                link_list = html_tree.xpath("//a")
                #On modifie les liens des images pour avoir une meilleure correspondance sur le futur site
                for img in img_list:
                    if "http://" not in img.get("src"):
                        image_name = img.get("src").split("/")[-1]
                        shutil.copy(os.path.join(folder, image_name), os.path.join(output_page_folder, "media", "img"))
                        img.set("src", "./media/img/{}".format(image_name))
                for link in link_list:
                    if "http://" not in link.get("href"):
                        link.set("href", "./" + link.get("href")[:-3] + ".html")
                html_page = str(etree.tostring(html_tree, pretty_print=True), encoding="utf-8")
            os.chdir(output_page_folder)
            print(os.path.join(output_page_folder , md_file[:-3] + ".html"))
            with open(os.path.join(output_page_folder , md_file[:-3] + ".html"), "w") as html_file:
                html_file.write(html_page)

# convert(r"C:\Users\Quentin Vandenhove\Desktop\ProjetPython\inputs", r"C:\Users\Quentin Vandenhove\Desktop\ProjetPython\outputs")
convert(os.path.join(sys.argv[1]), os.path.join(sys.argv[2]))