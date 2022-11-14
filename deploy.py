import os
import pathlib
import shutil
import subprocess

dist_target = 'material_ui/dist'
html_target = 'material_ui/public'
destfolder = 'build/'

# copy js and css files into the right folder

for file in pathlib.Path(dist_target).glob('*'):
    filename, file_extension = os.path.splitext(file)
    if file_extension == '.css':
        shutil.copy2(file, destfolder+'static/css')
    elif file_extension == '.js':
        shutil.copy2(file, destfolder+'static/script')

# copy html files into the right folder

for file in pathlib.Path(html_target).glob('*.html'):
    shutil.copy2(file, destfolder)

# ask for deploy

answ = input("Would you like to deploy to fierbase hosting? (y/n)")

if answ == 'y': 
    subprocess.run(['firebase', 'deploy'])
else:
    print('Exit')