from markdown2 import Markdown
import os
markdowner = Markdown()

def convert(input_folder, output_folder):
    file_list = os.listdir(input_folder)
    template_html = ""
    with open("template.html", "r") as template_file:
        template_html = template_file.read()
    os.chdir(input_folder)
    for md_file in file_list:
        with open(md_file, "r") as md_content:
            content_html = markdowner.convert(md_content.read())
            html_page = template_html.replace("{{Mon_contenu}}", content_html, 1)
        with open(os.path.join(output_folder, md_file[:-3] + ".html"), "w") as html_file:
            html_file.write(html_page)

convert(os.path.join(os.getcwd(), "inputs"), os.path.join(os.getcwd(), "outputs"))