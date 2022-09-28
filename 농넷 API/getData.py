import pandas as pd
import urllib.request
import json
import csv
import datetime as dt
import glob as glob
import pymysql
import pandas

#########################################################################################
# API Setting
YYYYMMDD = '20200101'

output_file_name1 = "data.csv"   # 모든 데이터에 대한 csv 파일 이름 
output_file_name2 = "dataAvg.csv"    # 데이터 날짜, 지역, 품종으로 가격 거래량 평균 csv 파일 이름
#########################################################################################
# DB Setting
host = '20.214.186.164'
user = 'yis'
password = '1234'
db = 'yis'
charset = 'utf8'

# 기간 설정 
startDate ='20220301' 
endDate ='20220610'

items = ['참외', '포도', '사과', '딸기', '수박', '배추', '무', '마늘', '홍고추', '양파', '감자', '고구마']

table_name = 'sold_items_table'   # 저장할 테이블
column = '(sold_num, item_name, date, market, location, kind, price, total_quantity, quantity, predict_price)'   # 저장할 테이블의 컬럼
values = '(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'   # 컬럼의 수만큼 %s 입력
#########################################################################################



# 농넷으로부터 데이터 받아와 CSV 파일로 저장하는 함수
def getNongNetAPI() : 

    url = 'https://www.nongnet.or.kr/api/whlslDstrQr.do?sdate=' # sdate = 날짜

    # today = datetime.datetime.today()
    # yesterday = (today - datetime.timedelta(1)).strftime('%Y%m%d')  # 어제의 날짜

    print('Receiving Data on '+ YYYYMMDD +'...')
    response = urllib.request.urlopen(url+YYYYMMDD).read()  # 데이터 읽기
    response = json.loads(response)   # JSON형태로 API를 제공해줌
    data = response['data']
    if len(data) ==0:   # 데이터가 비었을 경우
        print('Data is Empty...')
        return
    print('Complete Receving Data on '+ YYYYMMDD +'...')


    for idx, i in enumerate(data):   # 테이블 스키마에 맞게 JSON 데이터를 변경 해준다. 
        dict = i
        del(dict['LV_NM'], dict['DAN_NM'], dict['SIZE_NM'], dict['COST'], dict['CMP_NM'], dict['POJ_NM'], dict['DANQ'])  # 해당 하는 컬럼은 지움
        data[idx] = dict


    data_frame = pd.DataFrame(data)  # padas 내장함수로 json을 Data Frame형태로 변경

    # # data_Frame -> csv 로 변환하여 저장
    # data_frame.to_csv(output_file_name1, mode='w')
    # print('Complete '+ output_file_name1+ 'Creation File')

    # 테이블 스키마에 맞게 data_Frame 데이터를 변경 해준다. 현재는 품목, 도매시장, 날짜에 대한 반입량, 가격, 거래량을 본다. 
    # avg_data_frame = data_frame.groupby(['PUM_NM', 'WHSAL_NM', 'SALEDATE', 'SAN_NM', 'KIND_NM']).mean()
    avg_data_frame = data_frame.groupby(['PUM_NM', 'WHSAL_NM', 'SALEDATE', 'SAN_NM', 'KIND_NM']).mean()

    # data_Frame -> csv 로 변환하여 저장
    avg_data_frame.to_csv(output_file_name2, mode='w')
    print('Complete '+ output_file_name2+ 'Creation File\n')


# CSV 파일을 불러와 테이블에 데이터 삽입하는 함수 
def insertDB(table_name):
    # DB연결이 성공적으로 이루어지면 curser를 얻어온다.
    curs = conn.cursor(pymysql.cursors.DictCursor)

    # 넣을 테이블의 Cardinality를 가져온다. 이 값이 곧 Key가 되고 이 값 이후로 값을 집어넣는다.
    curs.execute("SELECT * FROM "+table_name) # 모든 데이터 출력
    rowCount = curs.rowcount     

    try:
        dataAvgCSVFile = pd.read_csv(output_file_name2)  # 넣을 csv파일 불러옴
        print("CSV File Read Success")
    except:
        print("CSV Read Failed")
        return

    csvRowCount = len(dataAvgCSVFile.index)   # csv의 행의 개수를 구한다.
    try:
        # avg_data_frame 의 값을 행단위로 DB에 집어넣는다. 
        print("Commit in Progress...")
        sold_num = rowCount
        
        for i in range(0, csvRowCount):
            if dataAvgCSVFile.loc[i].PUM_NM in items:
                
                sold_num = sold_num+1
                   
                sql="INSERT INTO "+ table_name + column + ' VALUES' + values

                # 날짜 형식 변경
                sold_Date = str(dataAvgCSVFile.loc[i].SALEDATE)
                year = sold_Date[0:4]
                month = sold_Date[4:6]
                day = sold_Date[6:8]
                sold_Date = year + '-' + month + '-' + day
                    
                # 가격 
                if dataAvgCSVFile.loc[i].TOT_QTY == 0:
                    price = 0
                else:
                    price = int(dataAvgCSVFile.loc[i].TOT_AMT / dataAvgCSVFile.loc[i].TOT_QTY)
                    
                tu = (sold_num, dataAvgCSVFile.loc[i].PUM_NM, sold_Date, dataAvgCSVFile.loc[i].WHSAL_NM, dataAvgCSVFile.loc[i].SAN_NM, dataAvgCSVFile.loc[i].KIND_NM, price, int(dataAvgCSVFile.loc[i].TOT_QTY), int(dataAvgCSVFile.loc[i].QTY), 0)
                curs.execute(sql,tu)
        conn.commit()
        print("Commit Completed!!\n")
    except:
        print("SQL Error\n")
        return


# DB Server에 정상적으로 연결되면 커넥션 객체를 반환한다.
try:
    conn = pymysql.connect(host = host, user = user, password = password, db = db, charset = charset)
except:
     print("DB Connection Failed")
if conn :
    print("DB Connection Success")
    
    dt_index = pandas.date_range(start=startDate, end=endDate)
    dt_list = dt_index.strftime("%Y%m%d").tolist()

    for i in dt_list:
        YYYYMMDD = str(i)
        getNongNetAPI()
        insertDB(table_name)    

    print("  _____                           _        _    ")
    print(" /  __ \                         | |      | | ")
    print(" | /  \/  ___   _ __ ___   _ __  | |  ___ | |_   ___ ")
    print(" | |     / _ \ | '_ ` _ \ | '_ \ | | / _ \| __| / _ \\")
    print(" | \__/\| (_) || | | | | || |_) || ||  __/| |_ |  __/")
    print("  \____/ \___/ |_| |_| |_|| .__/ |_| \___| \__| \___|")
    print("                          | |                        ")
    print("                          |_|                        ")
