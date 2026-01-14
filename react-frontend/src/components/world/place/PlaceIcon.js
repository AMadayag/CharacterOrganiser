export default function PlaceIcon({ data }) {
  return (
    <div className="place-icon">
      <img
      src="images/characterIcon/CharacterIconBust.png"
      alt="Place"
      className="icon"
      />
      <p>{data.name}</p>
    </div>
  )
}
// need to fix this, is currently just character icon for testing