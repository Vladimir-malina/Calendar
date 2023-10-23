import styled from "styled-components";

const Container = styled.div<{ isEdit: boolean }>`
  display: flex;
  gap: 3px;
  margin-bottom: 3px;
  .color-label {
    height: 8px;
    width: 30px;
    border-radius: 2px;
    ${(props) => props.isEdit && "cursor: pointer"};
  }
`;

export type TaskColorLabelsProps = {
  colorLabels: Array<string>;
  onClick?: AnyFunction;
  isEdit?: boolean;
  className?: string;
};

export function TaskColorLabels(props: TaskColorLabelsProps) {
  const { colorLabels, onClick, isEdit = false, className } = props;
  const additionalProps = (color: string, index: number) =>
    isEdit && onClick ? { onClick: () => onClick(color, index) } : {};

  return (
    <Container isEdit={isEdit} className={className}>
      {colorLabels.map((color, index) => (
        <div
          className="color-label"
          key={index}
          style={{ backgroundColor: color }}
          {...additionalProps(color, index)}
        />
      ))}
    </Container>
  );
}
