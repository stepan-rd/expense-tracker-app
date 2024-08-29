
type Props = {
  onClick?: () => void;
  className?: string;
};

export function Overlay({ onClick, className }: Props) {
  return (
    <div
      onClick={onClick}
      className={`fixed bg-stone-900 opacity-45 inset-0 h-screen w-screen ${className}`}
    ></div>
  );
}
