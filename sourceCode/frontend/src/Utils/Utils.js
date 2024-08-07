import { useNavigate } from "react-router-dom";

export function scrollDown(e) {
    e.scrollTop = e.scrollHeight;
}

export function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
}

export function loader(e) {
  try{
    let loadInterval
    e.textContent = 'Typing'
    loadInterval = setInterval(() => {
      e.textContent += '.';
        if (e.textContent === 'Typing....') {
          e.textContent = 'Typing';
        }
    }, 300);
  }
  catch{} 
}

export function sanetizeString(prompt){
  return prompt.replaceAll("'", "''")
}

export function checkPrivLevel(level, navigate){
  if (JSON.parse(sessionStorage.getItem("username")) === null) {
    navigate('/login')
  }
  else if (JSON.parse(sessionStorage.getItem("privlevel")) !== level){
    navigate('/noaccess')
  }
}
