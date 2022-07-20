import App          from '.';
import React        from 'react';
import { store    } from '../../store';
import { Provider } from 'react-redux';
import { render   } from '@testing-library/react';


test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/startMessage/i)).toBeInTheDocument();
});
