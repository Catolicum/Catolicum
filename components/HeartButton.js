export default function HeartButton({ libro, isInWishlist, onToggle, onNeedLogin, hasUser }) {
  var active = isInWishlist(libro.slug);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!hasUser) { onNeedLogin(); return; }
    onToggle(libro);
  }

  return (
    <button
      onClick={handleClick}
      title={active ? 'Quitar de mi lista' : 'Añadir a mi lista'}
      style={{
        background: active ? '#FCEBEB' : 'none',
        border: active ? '0.5px solid #F0C0C0' : '0.5px solid #C8D4E0',
        borderRadius: '50%',
        width: 34, height: 34,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'all .15s',
        padding: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? '#A32D2D' : 'none'} stroke={active ? '#A32D2D' : '#8AAFD4'} strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
