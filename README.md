# Trello clone project

## 사용기술
- typescript : `4.3.5`
- nodejs : `14.17.2`
- express : `4.17.1`
- socket.io : `4.1.2`
- Template - ejs : `3.1.6`

## 목표 기능
1. 리스트 추가
2. 카드 추가
3. 리스트간 카드 이동(drag and drop)
4. 변경 내용은 서버를 통해 다른 클라이언트에게 동기화 되어야 한다.(db에 영구적으로 저장하지 않아도 된다.)

## 실행
1. `npm install`
2. `npm run start`
3. [http://localhost:3000](http://localhost:3000) : 클라이언트 n개 접속   

### 참고자료
- https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API
