import styled from "styled-components";
import { LABEL_COLORS } from "../constants";


type ColorInputCompProps = {
  onChange: AnyFunction;
  value?: string;
  onSubmit?: AnyFunction;
  buttonLabel: string;
  onDelete?: AnyFunction;
};

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

export const ColorInput = (props: ColorInputCompProps) => {
  const { onChange, value, onSubmit, buttonLabel, onDelete } = props;
  return (
    <Container>
      <input type="color" list="presetColors" onChange={onChange} value={value} />
      <datalist id="presetColors">
        {LABEL_COLORS.map((color: string) => <option key={color}>{color}</option>)}
      </datalist>
      {onSubmit && (<button type="button" onClick={onSubmit}>
        {buttonLabel}
      </button>)}
      {(onDelete && value) && (
        <button type="button" onClick={onDelete}>
          Delete Color
        </button>
      )}
    </Container>
  );
};
