import json
import os
script_path = os.path.dirname(os.path.abspath(__file__))

cau_mau = {}
trieu_chung = {}
cach_dieu_tri = {}
cau_tra_loi = {}

def getDataJson():
    global cau_mau
    global trieu_chung
    global cach_dieu_tri
    global cau_tra_loi

    with open(os.path.join(script_path, '../data/y_dinh-cau_mau.json'), 'r', encoding='utf-8') as json_file:
        cau_mau = json.load(json_file)
        
    with open(os.path.join(script_path, '../data/ten_benh-trieu_chung.json'), 'r', encoding='utf-8') as json_file:
        trieu_chung = json.load(json_file)

    with open(os.path.join(script_path, '../data/ten_benh-cach_dieu_tri.json'), 'r', encoding='utf-8') as json_file:
        cach_dieu_tri = json.load(json_file)

    with open(os.path.join(script_path, '../data/y_dinh-cau_tra_loi.json'), 'r', encoding='utf-8') as json_file:
        cau_tra_loi = json.load(json_file)


getDataJson()