interface Props {
  lives: number;
}

export default function DisplayHanged(props: Props) {
  const { lives } = props;

  const imageNumber = 6 - lives;

  if (imageNumber < 0 || imageNumber > 6) {
    return null;
  }

  return (
    <figure>
      <img src={`/img/hanged-${imageNumber}.png`} alt="" width={300} height={300} />
    </figure>
  );
}
