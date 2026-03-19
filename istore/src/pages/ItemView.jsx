import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToBag, selectBagItems } from '../store/bagSlice'


const Stars = ({ rating }) => {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span style={{ color: '#f59e0b', fontSize: 12, letterSpacing: 1 }}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(empty)}
    </span>
  )
}

export default function ItemView() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const dispatch   = useDispatch()
  const products   = useSelector((s) => s.products.items)
  const bagItems   = useSelector(selectBagItems)
  const product    = products.find((p) => p.id === Number(id))
  const [qty, setQty] = useState(1)

  if (!product) return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <p>Product not found.</p>
      <button onClick={() => navigate('/')} style={{ marginTop: 12, cursor: 'pointer' }}>← Back</button>
    </div>
  )

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) dispatch(addToBag(product))
    navigate('/bag')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#fff' }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{ width: 52, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, background: '#e94560', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>S</span>
        </div>
        {[
          { icon: '⊞', label: 'Dashboard' },
          { icon: '◎', label: 'Products', active: true },
          { icon: '♡', label: 'Wishlist' },
          { icon: '⊙', label: 'Settings' },
        ].map((item) => (
          <div key={item.label} title={item.label} style={{ width: 36, height: 36, borderRadius: 8, background: item.active ? '#e94560' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: item.active ? '#fff' : '#888', fontSize: 16, marginBottom: 4 }}>
            {item.icon}
          </div>
        ))}
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Product detail */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>

          {/* Back breadcrumb */}
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 12, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            ← Back
          </button>

          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

            {/* Product image */}
            <div style={{
              width: 200, height: 200, flexShrink: 0,
              background: '#f8f8f8', borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', border: '1px solid #f0f0f0',
            }}>
              <img
                src={product.img}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>

            {/* Info column */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Category tag */}
              <p style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>
                {product.brand}
              </p>

              {/* Title */}
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 2, lineHeight: 1.2 }}>
                {product.name}
              </h2>

              {/* Subtitle */}
              <p style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>Total box 1</p>

              {/* Stars + reviews */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                <Stars rating={product.rating} />
                <span style={{ fontSize: 11, color: '#aaa' }}>{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>
                  ${product.price.toFixed(2)}
                </span>
                <span style={{ fontSize: 14, color: '#bbb', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>

              {/* Add to Bag button */}
              <button
                onClick={handleAdd}
                style={{
                  background: '#e94560', color: '#fff',
                  border: 'none', borderRadius: 8,
                  padding: '10px 28px', fontSize: 13,
                  fontWeight: 600, cursor: 'pointer',
                  marginBottom: 20,
                }}
              >
                Add to Bag
              </button>

              {/* Description heading */}
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 8 }}>Description</h4>

              {/* Description text */}
              <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7, maxWidth: 480 }}>
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT BAG PANEL ── */}
        <aside style={{ width: 160, borderLeft: '1px solid #f0f0f0', background: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid #f0f0f0' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#111', margin: 0 }}>Bag</p>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '8px 12px' }}>
            {bagItems.length === 0 ? (
              <p style={{ fontSize: 10, color: '#bbb', textAlign: 'center', marginTop: 20 }}>Empty</p>
            ) : (
              bagItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f5f5f5', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 2 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 9, fontWeight: 600, color: '#111', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontSize: 9, color: '#888', margin: 0 }}>x{item.qty}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          {bagItems.length > 0 && (
            <div style={{ padding: '8px 12px', borderTop: '1px solid #f0f0f0' }}>
              <button onClick={() => navigate('/bag')} style={{ width: '100%', padding: '6px 0', background: '#e94560', color: '#fff', border: 'none', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
                View Bag
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
