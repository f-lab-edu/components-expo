type ArrowProps = {
  className?: string;
  style?: object;
  onClick?: () => void;
};

export default function CarouselArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'gray',
        padding: '28px 16px',
        borderRadius: '4px',
      }}
      onClick={onClick}
    />
  );
}
