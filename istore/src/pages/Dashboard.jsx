import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToBag, selectBagItems, selectBagCount } from '../store/bagSlice'

const CATEGORIES = []

export default function Dashboard() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const products  = useSelector((s) => s.products.items)
  const bagItems  = useSelector(selectBagItems)
  const bagCount  = useSelector(selectBagCount)
  const [search, setSearch] = useState('')

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#fff' }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{
        width: 52,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        flexShrink: 0,
        gap: 4,
      }}>
        {/* Logo icon */}
        <div style={{ width: 28, height: 28, background: '#111010ff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>S</span>
        </div>

        {/* Nav icons */}
        {[
          { icon: '⊞', label: 'Dashboard', active: true },
          { icon: '◎', label: 'Products' },
          { icon: '♡', label: 'Wishlist' },
          { icon: '⊙', label: 'Settings' },
        ].map((item) => (
          <div
            key={item.label}
            title={item.label}
            style={{
              width: 36, height: 36,
              borderRadius: 8,
              background: item.active ? '#111010ff' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: item.active ? '#fff' : '#888',
              fontSize: 16, marginBottom: 4,
            }}
          >
            {item.icon}
          </div>
        ))}

        <div style={{ flex: 1 }} />

        {/* Avatar at bottom */}
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 600 }}>
          J
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {/* Search */}
          <div style={{ flex: 1, position: 'relative', maxWidth: 340 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: 13 }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products"
              style={{
                width: '100%', padding: '7px 12px 7px 30px',
                border: '1px solid #e8e8e8', borderRadius: 8,
                fontSize: 13, background: '#fafafa', color: '#333',
              }}
            />
          </div>

          {/* Bag icon with badge */}
          <div
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => navigate('/bag')}
          >
            <span style={{ fontSize: 18, color: '#333' }}>🛍</span>
            {bagCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: '#e94560', color: '#fff',
                borderRadius: '50%', width: 16, height: 16,
                fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {bagCount}
              </span>
            )}
          </div>

          {/* "Bag" button */}
          <button
            onClick={() => navigate('/bag')}
            style={{
              background: '#e94560', color: '#fff', border: 'none',
              borderRadius: 6, padding: '6px 14px', fontSize: 12,
              fontWeight: 600, cursor: 'pointer',
            }}
          >
            Bag
          </button>
        </div>

        {/* Content + Right Panel */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Grid area */}
          <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>

            {/* Category row labels */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              {CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontSize: 11, color: '#888',
                    background: '#f5f5f5', borderRadius: 4,
                    padding: '3px 8px', cursor: 'pointer',
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Product Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 2fr))',
            
            }}>
              {filtered.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  style={{
                    background: '#fff',
                    border: '1px solid #f0f0f0',
                    borderRadius: 10,
                    padding: 10,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  {/* Product image */}
                  <div style={{
                    width: '100%', paddingBottom: '80%', position: 'relative',
                    borderRadius: 6, overflow: 'hidden', background: '#f8f8f8', marginBottom: 8,
                  }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'contain', padding: 6,
                      }}
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>

                  <p style={{ fontSize: 11, fontWeight: 600, color: '#111', margin: '0 0 2px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name}
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#111', margin: 0 }}>
                    ${p.price.toFixed(2)}
                  </p>

                  {/* Add to bag */}
                  <button
                    onClick={(e) => { e.stopPropagation(); dispatch(addToBag(p)) }}
                    style={{
                      marginTop: 6, width: '100%', padding: '4px 0',
                      background: '#111', color: '#fff', border: 'none',
                      borderRadius: 4, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT BAG PANEL ── */}
          <aside style={{
            width: 160,
            borderLeft: '1px solid #f0f0f0',
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            overflow: 'hidden',
          }}>
            {/* Panel header */}
            <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid #f0f0f0' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#111', margin: 0 }}>Bag</p>
            </div>

            {/* Bag items */}
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

            {/* Go to bag button */}
            {bagItems.length > 0 && (
              <div style={{ padding: '8px 12px', borderTop: '1px solid #f0f0f0' }}>
                <button
                  onClick={() => navigate('/bag')}
                  style={{
                    width: '100%', padding: '6px 0', background: '#e94560',
                    color: '#fff', border: 'none', borderRadius: 5,
                    fontSize: 10, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  View Bag
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
