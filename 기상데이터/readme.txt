- 설명 - 

calculate는 특정일 기준으로 설정한 기간동안의 날씨데이터를 통계를 내서 csv파일로 만들어주는 프로그램이다.
예를들어 20220601을 기준으로 60일이전부터 60일동안의 날씨데이터를 통계를 내서 csv파일로 만들어준다.
날씨데이터는 기상청 기상자료개방포털에서 전라남도 해남지역에 대한 2012-06-03부터 2022-06-03 까지의 날씨데이터를 가져왔다.

- 날씨 변수 설명-

AvgTemp : 평균온도
MaxTemp : 최고온도
MInTemp : 최저온도
Prec : 강수량
MaxInsWind : 최고순간풍속
MaxWind : 최고풍속
AvgWind : 평균풍속
AvgDewPoint : 이슬점온도
MinHum : 최저 상대습도
AvgHum: 평귬 상대습도
SunTime : 일조합
AvgGround : 평균지면온도
AvgGraggTemp : 최저초상온도

- 사용법 - 

1. startDate와 endDate를 설정한다.

2. dateOffset으로 특정일 기준 얼마전 데이터 부터 수집할지를 결정한다.

3. dateOffset2로 dateOffset으로부터 몇일동안의 데이터를 수집할지 결정한다.

4. inputFileName과 outputFileName을 입력하여 입력과 출력파일을 설정한다.