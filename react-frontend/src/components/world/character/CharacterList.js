function CharacterList({ characters }) {
  return (
    <div className="character-list">
      {characters.map(c => (
        <CharacterIcon key={c.id} character={c} />
      ))}
    </div>
  )
}
