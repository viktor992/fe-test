import highlightedlabelStyles from './highlightedlabel.module.scss';

interface HighlightedLabelProps {
  value: string;
  highlightedText?: string;
}

export const HighlightedLabel: React.FC<HighlightedLabelProps> = ({
  value,
  highlightedText = '',
}) => {
  const parts = value.split(new RegExp(`(${highlightedText})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === highlightedText.toLowerCase()
              ? highlightedlabelStyles['label--highlighted']
              : highlightedlabelStyles['label']
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};
