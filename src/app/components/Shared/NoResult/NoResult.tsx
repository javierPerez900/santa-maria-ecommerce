interface NoResultProps {
  text?: string;
}
export function NoResult({ text = "No hay resultados" }: NoResultProps) {
  return (
    <div style={{ textAlign: "center", margin: "50px" }}>
      <p>{text}</p>
    </div>
  );
}
