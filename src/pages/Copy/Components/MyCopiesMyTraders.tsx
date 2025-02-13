import { FC, useMemo } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import FuturesTableTitle from "../../Futures/Components/TableTitle";
import { Trans, t } from "@lingui/macro";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { MyCopiesMyTradersList } from "../Hooks/useMyCopies";
import { DefaultKolIcon } from "../../../components/icons";
import GreyButton from "../../../components/MainButton/GreyButton";

interface MyCopiesMyTradersProps {
  copyCallBack: (name: string, address: string) => void;
  stopCallBack: (address: string) => void;
  list: MyCopiesMyTradersList[];
}

const MyCopiesMyTraders: FC<MyCopiesMyTradersProps> = ({ ...props }) => {
  const { isBigMobile } = useWindowWidth();

  const rows = props.list.map((item, index) => {
    return (
      <Row
        key={`MyCopiesMyTraders + ${index}`}
        copyCallBack={() => {
          props.copyCallBack(item.nickName, item.kolAddress);
        }}
        stopCallBack={() => {
          props.stopCallBack(item.kolAddress);
        }}
        data={item}
      />
    );
  });

  const noOrder = useMemo(() => {
    return false;
  }, []);

  const mobile = useMemo(() => {
    const items = props.list.map((item, index) => {
      const nickName = item.nickName;
      const kolAddress = item.kolAddress.showAddress();
      const copyAccountBalance = item.copyAccountBalance.floor(2);
      const profit = item.profit.floor(2);

      const kolIcon = () => {
        if (item.avatar !== "-" && item.avatar !== "") {
          return (
            <Box
              sx={(theme) => ({
                width: "24px",
                height: "24px",
                borderRadius: "12px",
                background: theme.normal.primary,
                overflow: "hidden",
                "& img": {
                  width: "24px",
                  height: "24px",
                },
              })}
            >
              <img src={item.avatar} alt="kolIcon" />
            </Box>
          );
        } else {
          return (
            <Box
              sx={(theme) => ({
                width: "24px",
                height: "24px",
                borderRadius: "12px",
                background: theme.normal.primary,
                "& svg": {
                  width: "24px",
                  height: "24px",
                  display: "block",
                },
              })}
            >
              <DefaultKolIcon />
            </Box>
          );
        }
      };
      return (
        <Stack
          key={`MyCopiesMyTradersMobile + ${index}`}
          spacing={"20px"}
          sx={(theme) => ({
            borderRadius: "12px",
            background: theme.normal.bg1,
            padding: "20px 12px",
          })}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={"8px"}>
            {kolIcon()}
            <Stack spacing={"4px"}>
              <Box
                sx={(theme) => ({
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: theme.normal.text0,
                })}
              >
                {nickName}
              </Box>
              <Box
                sx={(theme) => ({
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: theme.normal.text2,
                })}
              >
                {kolAddress}
              </Box>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack spacing={"4px"} width={"100%"}>
              <Box
                sx={(theme) => ({
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  color: theme.normal.text2,
                })}
              >
                <Trans>Remaining Copy Amount</Trans>
              </Box>
              <Box
                sx={(theme) => ({
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "20px",
                  color: theme.normal.text0,
                })}
              >
                {copyAccountBalance}
              </Box>
            </Stack>

            <Stack spacing={"4px"} width={"100%"}>
              <Box
                sx={(theme) => ({
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  color: theme.normal.text2,
                })}
              >
                <Trans>Profit</Trans>
              </Box>
              <Stack direction={"row"} spacing={"4px"} alignItems={"flex-end"}>
                <Box
                  sx={(theme) => ({
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "20px",
                    color: theme.normal.text0,
                  })}
                >
                  {profit}ATF
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            spacing={"8px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <GreyButton
              title={t`Settings`}
              onClick={() => {
                props.copyCallBack(nickName, kolAddress);
              }}
              style={{
                fontSize: "10px",
                lineHeight: "14px",
                borderRadius: "4px",
                padding: "5px 12px",
                height: "24px",
                width: "fit-content",
              }}
            />
            {item.follow ? (
              <GreyButton
                title={t`Stop Copying`}
                onClick={() => {
                  props.stopCallBack(item.kolAddress);
                }}
                style={{
                  fontSize: "10px",
                  lineHeight: "14px",
                  borderRadius: "4px",
                  padding: "5px 12px",
                  height: "24px",
                  width: "fit-content",
                }}
              />
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
      );
    });
    return (
      <Stack paddingX={"12px"} spacing={"16px"} paddingBottom={"20px"}>
        {items}
      </Stack>
    );
  }, [props]);

  const pc = useMemo(() => {
    return (
      <FuturesTableTitle
        dataArray={[t`Trader`, t`Remaining Copy Amount`, t`Profit`, t`Operate`]}
        noOrder={noOrder}
        helps={[]}
        noNeedPadding
      >
        {rows}
      </FuturesTableTitle>
    );
  }, [noOrder, rows]);
  return <>{isBigMobile ? mobile : pc}</>;
};

const tdNoPadding = {
  padding: "0px !important",
};

interface RowProps {
  copyCallBack: (name: string, address: string) => void;
  stopCallBack: (address: string) => void;
  data: MyCopiesMyTradersList;
}

const Row: FC<RowProps> = ({ ...props }) => {
  const nickName = props.data.nickName;
  const kolAddress = props.data.kolAddress.showAddress();
  const copyAccountBalance = props.data.copyAccountBalance.floor(2);
  const profit = props.data.profit.floor(2);

  const kolIcon = () => {
    if (props.data.avatar !== "-" && props.data.avatar !== "") {
      return (
        <Box
          sx={(theme) => ({
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            background: theme.normal.primary,
            overflow: "hidden",
            "& img": {
              width: "24px",
              height: "24px",
            },
          })}
        >
          <img src={props.data.avatar} alt="kolIcon" />
        </Box>
      );
    } else {
      return (
        <Box
          sx={(theme) => ({
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            background: theme.normal.primary,
            "& svg": {
              width: "24px",
              height: "24px",
              display: "block",
            },
          })}
        >
          <DefaultKolIcon />
        </Box>
      );
    }
  };
  return (
    <TableRow
      sx={(theme) => ({ "&: hover": { background: theme.normal.bg1 } })}
    >
      <TableCell>
        <Stack direction={"row"} alignItems={"center"} spacing={"8px"}>
          {kolIcon()}
          <Stack spacing={"4px"}>
            <Box
              sx={(theme) => ({
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "20px",
                color: theme.normal.text0,
              })}
            >
              {nickName}
            </Box>
            <Box
              sx={(theme) => ({
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text2,
              })}
            >
              {kolAddress}
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "12px",
            lineHeight: "16px",
            color: theme.normal.text0,
            paddingRight: "20px",
          })}
        >
          {copyAccountBalance}ATF
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "12px",
            lineHeight: "16px",
            color: theme.normal.text0,
            paddingRight: "20px",
          })}
        >
          {profit}ATF
        </Box>
      </TableCell>
      <TableCell>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={"8px"}
        >
          <GreyButton
            title={t`Settings`}
            onClick={() => {
              props.copyCallBack(nickName, kolAddress);
            }}
            style={{
              fontSize: "10px",
              lineHeight: "14px",
              borderRadius: "4px",
              padding: "5px 12px",
              height: "24px",
              width: "fit-content",
            }}
          />

          {props.data.follow ? (
            <GreyButton
              title={t`Stop Copying`}
              onClick={() => {
                props.stopCallBack(kolAddress);
              }}
              style={{
                fontSize: "10px",
                lineHeight: "14px",
                borderRadius: "4px",
                padding: "5px 12px",
                height: "24px",
                width: "fit-content",
              }}
            />
          ) : (
            <></>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default MyCopiesMyTraders;
