/**
 * Selectores de almacenamiento y color más el botón de añadir a la cesta.
 *
 * Si un atributo tiene una sola opción, llega ya seleccionada. Con varias, el
 * botón se habilita cuando el usuario ha elegido las dos.
 */
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const FEEDBACK_MS = 2500;

function initialCode(options) {
  return options.length === 1 ? options[0].code : null;
}

/** Grupo de radios con aspecto de botón. Nativo por debajo, así que es accesible con teclado. */
function OptionGroup({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="options">
      <legend>{legend}</legend>
      <div className="options__list">
        {options.map((option) => (
          <label key={option.code} className="chip">
            <input
              type="radio"
              name={name}
              value={option.code}
              checked={value === option.code}
              onChange={() => onChange(option.code)}
            />
            <span>{option.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ProductActions({ product }) {
  const { storages = [], colors = [] } = product.options ?? {};
  const { addItem } = useCart();

  const [storageCode, setStorageCode] = useState(() => initialCode(storages));
  const [colorCode, setColorCode] = useState(() => initialCode(colors));
  const [status, setStatus] = useState('idle'); // idle | adding | added | error

  useEffect(() => {
    if (status !== 'added') return undefined;
    const timer = setTimeout(() => setStatus('idle'), FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const isComplete = storageCode !== null && colorCode !== null;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isComplete) return;

    setStatus('adding');
    try {
      await addItem({ id: product.id, colorCode, storageCode });
      setStatus('added');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="actions" onSubmit={handleSubmit}>
      <OptionGroup
        legend="Almacenamiento"
        name="storage"
        options={storages}
        value={storageCode}
        onChange={setStorageCode}
      />
      <OptionGroup legend="Color" name="color" options={colors} value={colorCode} onChange={setColorCode} />

      <button type="submit" className="button button--block" disabled={!isComplete || status === 'adding'}>
        {status === 'adding' ? 'Añadiendo…' : 'Añadir a la cesta'}
      </button>

      <p className={`actions__feedback${status === 'error' ? ' actions__feedback--error' : ''}`} role="status">
        {!isComplete && 'Selecciona almacenamiento y color.'}
        {status === 'added' && 'Producto añadido a la cesta.'}
        {status === 'error' && 'No se ha podido añadir. Inténtalo de nuevo.'}
      </p>
    </form>
  );
}
