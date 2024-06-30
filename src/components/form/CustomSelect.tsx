import { useState, useEffect, useRef } from "react";
import { animated, useTransition } from "@react-spring/web";

type CustomSelectProps = {
  options: { id: number; value: string }[];
  value: number | undefined;
  onChange: (id: number | undefined) => void;
  defaultValue?: string;
  id?: string;
};

type CustomSelectState = {
  selected: number | undefined;
  open: boolean;
};

const CustomSelect = ({
  options,
  value,
  onChange,
  defaultValue = "Select",
  id,
}: CustomSelectProps) => {
  const [state, setState] = useState<CustomSelectState>({
    selected: undefined,
    open: false,
  });

  const handleClick = (id: number | undefined) => {
    setState((prev) => ({ selected: id, open: !prev.open }));
    onChange(id);
  };

  const handleOpen = () => setState((prev) => ({ ...prev, open: !prev.open }));

  const transition = useTransition(state.open, {
    from: { opacity: 0, transform: "translateY(10px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    // leave: { opacity: 0, transform: "translateY(10px)" },
    config: { duration: 200 },
  });

  const thisElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setState((prev) => ({ ...prev, selected: value }));

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!thisElementRef.current?.contains(e.target)) {
          setState((prev) => ({ ...prev, open: false }));
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [state.open]);

  return (
    <div
      id={id ? id : undefined}
      className="custom-select"
      ref={thisElementRef}
    >
      <div className="custom-select__selected" onClick={handleOpen}>
        {state.selected !== undefined
          ? options.find((option) => option.id === state.selected)?.value
          : defaultValue}
      </div>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={{
                ...style,
                zIndex: 1,
              }}
              className="custom-select__options"
            >
              {state.selected !== undefined ? (
                <div
                  className="custom-select__option"
                  onClick={() => handleClick(undefined)}
                >
                  {defaultValue}
                </div>
              ) : null}
              {options.map((option) => (
                <div
                  className={`custom-select__option${
                    option.id === state.selected
                      ? " custom-select__option--selected"
                      : ""
                  }`}
                  key={option.id}
                  onClick={() => handleClick(option.id)}
                >
                  {option.value}
                </div>
              ))}
            </animated.div>
          )
      )}
    </div>
  );
};

export default CustomSelect;
