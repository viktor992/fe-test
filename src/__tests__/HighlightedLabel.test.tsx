import '@testing-library/jest-dom';
import { HighlightedLabel } from '../components/HighlightedLabel';
import { render } from '@testing-library/react';

test('Renders default HighlightedLabel', () => {
  const component = render(
    <HighlightedLabel value="Hello" highlightedText="lo" />,
  );

  const nonHighlightedElement = component.getByText('Hel');
  expect(nonHighlightedElement).toHaveClass('label');

  const highlightedElement = component.getByText('lo');
  expect(highlightedElement).toHaveClass('label--highlighted');
});
