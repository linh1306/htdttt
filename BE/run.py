from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import random
from lib.fuc import doc_trieu_chung_tu_string
from lib.train import train_intent, train_sick
from lib.getData import getDataJson, trieu_chung, cach_dieu_tri, cau_mau, cau_tra_loi

app = Flask(__name__)
CORS(app)


getDataJson()
trieu_chung_nguoi_dung = []

treeYDinh = train_intent(cau_mau)
treeBenh = train_sick(trieu_chung)

cauTraLoiThem = []


@app.route('/chatbot', methods=['POST'])
def xuLy():
    global cauTraLoiThem
    cauTraLoiThem = []
    data = request.get_json()
    if 'mess' in data:
        user_input = data["mess"]

        intent = treeYDinh.check(user_input)
        trieu_chung_new = doc_trieu_chung_tu_string(
            user_input, treeBenh.dictionary, trieu_chung)

        def switch_case(option):
            global trieu_chung_nguoi_dung
            global cau_tra_loi
            global cauTraLoiThem
            lenArr = len(set(trieu_chung_nguoi_dung))
            lenTmp = len(set(trieu_chung_nguoi_dung+trieu_chung_new))

            trieu_chung_nguoi_dung = list(
                set(trieu_chung_nguoi_dung + trieu_chung_new))
            
            if option == "tu choi":
                trieu_chung_nguoi_dung = [
                    item for item in trieu_chung_nguoi_dung if item not in trieu_chung_new]
                return ["Tôi đã ghi nhận được các triệu chứng:", trieu_chung_nguoi_dung]
            
            elif lenArr!=lenTmp:
                return ["Tôi đã ghi nhận được các triệu chứng:", trieu_chung_nguoi_dung]
            
            elif option == "yeu cau liet ke list trieu chung":
                return ["List triệu chứng :",list(treeBenh.dictionary)]
            
            elif option == "yeu cau chuan doan benh":
                res = []
                if len(trieu_chung_nguoi_dung) == 0:
                    res = ["Tôi xin lỗi nhưng tôi chưa ghi nhận triệu chứng nào của bạn, bạn có thể liệt kê ra các triệu chứng được không"]
                
                elif len(trieu_chung_nguoi_dung) < 3:
                    res.append("Chúng tôi đã ghi nhận được các triệu chứng :")
                    res.append(trieu_chung_nguoi_dung)
                    res.append("Nhưng chưa đủ để kết luận ra bệnh của bạn")
                    res.append("Liệu bạn có gặp phải các triệu chứng như :")
                    res.append([item for item in trieu_chung[treeBenh.check(
                        trieu_chung_nguoi_dung)] if item not in trieu_chung_nguoi_dung])

                else:
                    ten_benh = treeBenh.check(trieu_chung_nguoi_dung)
                    cauTraLoiThem = cach_dieu_tri[ten_benh]
                    res = ["có vẻ bạn bị bệnh : " + ten_benh]
                return res

            elif (option == "khong hieu duoc" or option == "can su tro giup") and len(trieu_chung_new):
                return ["Tôi đã ghi nhận được các triệu chứng:",trieu_chung_nguoi_dung]

            else:
                return [random.choice(cau_tra_loi[option])]

        return jsonify({
            "object": "chatbot",
            "mess": [
                {
                    "type": "text",
                    "value": switch_case(intent)
                }
            ] + cauTraLoiThem
        })
    else:
        return jsonify(message="Hello, World!")


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000)
    # app.run(host='192.168.0.38', port=8080)
    # app.run(host='172.16.10.54', port=8080)
    # app.run(host='10.20.70.98', port=8080)
    app.run(host='192.168.0.38', port=8080)
