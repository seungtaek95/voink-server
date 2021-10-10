# voink-server

### 음성파일 업로드 프로세스

1. 업로드 signed url 요청 (GET /records/upload-url)
2. 레코드 파일에 해당하는 key값과 함께 url 응답
3. url을 이용해서 레코드 파일 업로드 (/temp 디렉토리에 key를 파일명으로 저장)
4. 레코드 그룹 생성 요청 (POST /record-groups, key 사용)
5. DB에 레코드 정보 저장
6. temp 디렉토리의 레코드 파일을 /{userId}/{recordGroupId}/{recordId}.m4a로 이동