import "./TopNav.css"

export default function TopNav() {
  return(
    <div class="topnav">
      <a class="active" href="#home">Home</a>
      <a href="#worlds">My Worlds</a>
      <a href="#info">How To Use Character Organiser</a>
      <a href="#login" class="split">Login</a>
    </div>
  );
}
