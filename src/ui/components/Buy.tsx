import { ChangeEvent, FormEvent, useState } from 'react';

import { useOrderProducts } from '../../application/orderProducts';
import { TUsername } from '../../domain/user';
import { useUserStorage, useCartStorage } from '../../services/storageAdapter';

export function Buy(): JSX.Element {
  const orderProducts = useOrderProducts();
  const { user } = useUserStorage();
  const { cart } = useCartStorage();

  if (!user || !cart.products.length) return <></>;

  const [name, setName] = useState<TUsername>(user?.name ?? '');
  const [email, setEmail] = useState<TEmail>(user?.email ?? '');
  const [address, setaAddress] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);

    await orderProducts(user!, cart);
    setLoading(false);
  }

  return (
    <section>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setName(event.target.value)
            }
          />
        </label>
        <label htmlFor="email">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setEmail(event.target.value)
            }
          />
        </label>
        <label htmlFor="address">
          <span>Address</span>
          <textarea
            name="address"
            value={address}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>): void =>
              setaAddress(event.target.value)
            }
          ></textarea>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Preparing an order...' : 'Checkout'}
        </button>
      </form>
    </section>
  );
}
