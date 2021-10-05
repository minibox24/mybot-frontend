<template>
  <div class="privacy">
    <div class="content">
      <h1>미니봇 개인정보 처리방침</h1>

      <h2>개인정보 처리 목적</h2>
      <p>
        미니봇 서비스 이용과, 서비스 운영을 위해 봇 사용 로그와 오류 로그를
        수집합니다.
      </p>

      <h2>개인정보 수집 내용</h2>
      <p>
        기본: 유저 아이디, 유저 닉네임, 유저 프로필 사진 - 출석체크 랭킹, 랭킹,
        프로필 조회등에 사용됩니다.
      </p>
      <p>
        봇 사용 로그, 오류 로그: 서버 아이디, 서버 이름, 채널 아이디, 채널 이름,
        유저 아이디, 메시지 내용, 사용 시간 - 원활한 서비스 운영, 오류 수집등을
        위해서 사용됩니다. 가입하지 않은 경우에도 커맨드를 사용한다면
        수집됩니다.
      </p>

      <h2>개인정보 열람 내용과 대상</h2>
      <p>
        유저: 유저 아이디, 유저 닉네임, 유저 프로필 사진 - 출석체크 랭킹, 랭킹,
        프로필 조회등에 사용됩니다.
      </p>
      <p>
        개발자: 봇 사용 로그와 오류 로그 - 원활한 서비스 운영, 오류 수집등을
        위해서 사용됩니다. 오직 개발자 혼자서만 열람이 가능합니다.
      </p>

      <h2>개인정보 폐기</h2>
      <p>유저 데이터: "미니봇 탈퇴" 커맨드로 삭제가 가능합니다.</p>
      <p>봇 사용 로그, 오류 로그: 개발자에게 요청하여 삭제가 가능합니다.</p>
    </div>
  </div>
</template>

<style scoped>
.privacy {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  max-width: 70%;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-weight: 400;
}

p {
  font-weight: 300;
  margin: 0;
  margin-bottom: 0.5rem;
}
</style>
