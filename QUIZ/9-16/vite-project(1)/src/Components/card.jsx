import "../card.css"
function Card({ title, description, author }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Author: {author}</span>
    </div>
  )
}

export default Card