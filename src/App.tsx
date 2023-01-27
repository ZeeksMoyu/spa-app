import { useEffect, useState } from 'react';
import Products from './components/products/Products';

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  let startParams;
  searchParams.has('id') ? startParams = searchParams.get('id') : startParams = undefined

  const [id, setId] = useState<any>(startParams);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
      console.log(searchParams.get('id'))
      setId(parseInt(searchParams.get('id') as string))
    }
  }, []);

  return (
      <Products setId={setId} id={id} />
  );
};

export default App