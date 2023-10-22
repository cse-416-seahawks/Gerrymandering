import React, { useContext } from "react";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { GlobalContext, States } from "../../globalContext";

export default function StateChangeRadio(props: {
  onStateChangeMap: (newState : string) => void;
}) {
  const [stateName, setStateName] = React.useState("Nevada");
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <div className="StateMap-Change-Radio">
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <RadioGroup
          orientation="horizontal"
          aria-labelledby="segmented-controls-example"
          name="StateChange"
          value={stateName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setStateName(event.target.value);
            props.onStateChangeMap(event.target.value);
          }}
          sx={{
            minHeight: 48,
            padding: "4px",
            borderRadius: "12px",
            bgcolor: "neutral.softBg",
            "--RadioGroup-gap": "4px",
            "--Radio-actionRadius": "8px",
          }}
        >
          {[States.Virginia, States.Texas, States.Nevada].map((item) => (
            <Radio
              key={item}
              color="neutral"
              value={item}
              disableIcon
              label={item}
              variant="plain"
              sx={{
                px: "5.4rem",
                fontSize: "1.5rem",
                alignItems: "center",
              }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: {
                    ...(checked && {
                      bgcolor: "background.surface",
                      boxShadow: "sm",
                      "&:hover": {
                        bgcolor: "background.surface",
                      },
                    }),
                  },
                }),
              }}
            />
          ))}
        </RadioGroup>
      </Box>
    </div>
  );
}
