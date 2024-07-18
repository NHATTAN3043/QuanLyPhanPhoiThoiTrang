// Hàm để đọc giá trị của cookie
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    console.log(cookies)
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
}
  
  // Hàm để giải mã JWT
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }
  
  // Hàm kiểm tra access token và làm mới nếu cần thiết
  async function checkAndRefreshToken() {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      console.log('No access token found.');
      return;
    }
    
    const decodedToken = parseJwt(accessToken);
    if (!decodedToken) {
      console.log('Invalid access token.');
      return;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiryTime = decodedToken.exp;
  
    // Kiểm tra nếu token sắp hết hạn trong vòng 5 phút
    if ((tokenExpiryTime - currentTime) < 300) {
      console.log('Token is about to expire, refreshing...');
      
      // Gọi API để làm mới access token
      const refreshResponse = await fetch('/taikhoan/refresh', {
        method: 'POST',
        credentials: 'include' // Gửi cookie refresh token cùng yêu cầu
      });
      if (refreshResponse.ok) {
        console.log('Access token refreshed successfully.');
      } else {
        console.log('Failed to refresh access token.');
      }
    } else {
      console.log('Access token is still valid.');
    }
  }
    
  