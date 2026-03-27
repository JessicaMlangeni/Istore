import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectBagItems, selectBagSubtotal, removeFromBag, updateQty } from '../store/bagSlice'

export default function Bag() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const items     = useSelector(selectBagItems)
  const subtotal  = useSelector(selectBagSubtotal)
  const shipping  = 0
  const total     = subtotal + shipping

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#fff' }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{ width: 52, background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, flexShrink: 0 }}>
        <div
          onClick={() => navigate('/')}
          style={{ width: 28, height: 28, background: '#e94560', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, cursor: 'pointer' }}
        >
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>S</span>
        </div>
        {[
          { icon: '⊞', label: 'Dashboard' },
          { icon: '◎', label: 'Products' },
          { icon: '♡', label: 'Wishlist' },
          { icon: '⊙', label: 'Settings' },
        ].map((item) => (
          <div key={item.label} title={item.label} style={{ width: 36, height: 36, borderRadius: 8, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#888', fontSize: 16, marginBottom: 4 }}>
            {item.icon}
          </div>
        ))}
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left: items list */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>

          {/* Header */}
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 2 }}>
            Check your Bag Items
          </h3>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 20 }}>Oak MT-1</p>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <p style={{ color: '#aaa', fontSize: 14, marginBottom: 16 }}>Your bag is empty</p>
              <button
                onClick={() => navigate('/')}
                style={{ background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                Shop Now
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 0', borderBottom: '1px solid #f5f5f5',
                }}
              >
                {/* Image */}
                <div style={{ width: 64, height: 64, borderRadius: 8, background: '#f8f8f8', flexShrink: 0, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111', margin: '0 0 2px' }}>{item.name}</p>
                  <p style={{ fontSize: 11, color: '#888', margin: '0 0 6px' }}>{item.brand}</p>
              

                  {/* Qty stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid #e8e8e8', borderRadius: 6, overflow: 'hidden', width: 'fit-content' }}>
                    <button
                      onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}
                      style={{ width: 26, height: 26, background: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >−</button>
                    <span style={{ width: 28, textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#111', borderLeft: '1px solid #e8e8e8', borderRight: '1px solid #e8e8e8', lineHeight: '26px' }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
                      style={{ width: 26, height: 26, background: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >+</button>
                  </div>
                </div>

                {/* Price + remove */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111', margin: '0 0 4px' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromBag(item.id))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: 12 }}
                  >✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── RIGHT SUMMARY PANEL ── */}
        <aside style={{ width: 180, borderLeft: '1px solid #f0f0f0', background: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, padding: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#111', marginBottom: 16 }}>Bag</p>

          {/* Summary rows */}
          <div style={{ marginBottom: 12 }}>
            {[
              ['Subtotal', `$${subtotal.toFixed(2)}`],
              ['Shipping', shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: '#888' }}>{k}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#111' }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 10, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>Total</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            disabled={items.length === 0}
            style={{
              width: '100%', padding: '9px 0', background: items.length === 0 ? '#ccc' : '#e94560',
              color: '#fff', border: 'none', borderRadius: 7, fontSize: 12,
              fontWeight: 600, cursor: items.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Checkout
          </button>

          <button
            onClick={() => navigate('/')}
            style={{ width: '100%', padding: '8px 0', background: 'none', color: '#888', border: 'none', fontSize: 11, cursor: 'pointer', marginTop: 8 }}
          >
            Continue Shopping
          </button>
        </aside>
      </div>
    </div>
  )
}
