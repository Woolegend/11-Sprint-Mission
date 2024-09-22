const validInputs = {
  email: false,
  nickname: false,
  password: false,
  passwordRepeat: false
}
/**
 * 입력한 이메일이 다음 형식에 맞는지 확인한다.   
 * - 이메일을 입력했는가
 * - 이메일이 정규표현식에 부합한가
 */
function checkEmailFormat() {
  const fieldset = this.parentNode;
  const alert = fieldset.querySelector('.input-alert');
  const email = this.value.trim();
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

  // 이메일 미입력
  if (email === '') {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '이메일을 입력해주세요.';
    validInputs.email = false;
    return;
  }

  // 잘못된 형식의 이메일
  if (!regex.test(email)) {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '잘못된 이메일 형식입니다.';
    validInputs.email = false;
    return;
  }

  // 문제 없음
  this.classList.remove('warning');
  alert.classList.remove('warning');
  alert.textContent = '';
  validInputs.email = true;
}

// 입력 비밀번호 형식 확인 함수
function checkPasswordFormat() {
  // input tag를 포함하는 fieldset
  const fieldset = this.parentNode;
  // input과 관련된 문구를 삽입할 p태그
  const alert = fieldset.querySelector('.input-alert');
  const password = this.value.trim();

  // 비밀번호 미입력
  if (password === '') {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '비밀번호를 입력해주세요.';
    validInputs.password = false;
    return;
  }

  // 짧은 비밀번호
  if (password.length < 8) {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '비밀번호를 8자 이상 입력해주세요.';
    validInputs.password = false;
    return;
  }

  // 문제 없음
  this.classList.remove('warning');
  alert.classList.remove('warning');
  alert.textContent = '';
  validInputs.password = true;
}

// 비밀번호 표기 토글 이벤트 핸들러
function togglePasswordVisibility() {
  // password input tag
  const inputTag = this.previousElementSibling;
  const type = inputTag.getAttribute('type') === 'password' ? 'text' : 'password';

  // 비밀번호 입력란을 가리킴
  inputTag.setAttribute('type', type);

  // 비밀번호 표기 버튼 토글
  Array.from(this.children).forEach(e => e.classList.toggle('hide'))
}

document.querySelectorAll('.visibility-btn').forEach(btn => {
  console.log(btn)
  btn.addEventListener('click', togglePasswordVisibility)
})