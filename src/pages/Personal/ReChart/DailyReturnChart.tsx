import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { FC } from "react";
import useSWR from "swr";
import useTheme from "../../../hooks/useTheme";
import { CustomTooltip } from "./CustomTooltip";
import numeral from "numeral";
import { Stack } from "@mui/system";
import useNEST from "../../../hooks/useNEST";

type ChartsProps = {
  address: string | undefined;
  from?: string;
  to?: string;
  simple?: boolean;
};

const ReCharts: FC<ChartsProps> = ({ ...props }) => {
  const { nowTheme } = useTheme();
  const { chainsData } = useNEST();
  const to = props.to ?? new Date().toLocaleDateString().replaceAll("/", "-");
  const from =
    props.from ??
    new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      .toLocaleDateString()
      .replaceAll("/", "-");

  const { data } = useSWR(
    `https://db.arithfi.com/dashboardapi/dashboard/v2/personal/return?address=${
      props.address
    }&chainId=${chainsData.chainId ?? 56}&from=${from}&to=${to}`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((res: any) =>
          res.value.map((item: any) => ({
            date: item.date,
            get: item.daily >= 0 ? item.daily : 0,
            loss: item.daily < 0 ? item.daily : 0,
          }))
        )
  );

  return (
    <Stack width={"100%"} height={"100%"}>
      {props.simple && data?.length > 0 && (
        <Stack
          sx={() => ({
            fontSize: "18px",
            lineHeight: "24px",
            fontWeight: "700",
            color: "#F9F9F9",
          })}
        >
          {Number(
            data[data.length - 1]?.get === 0
              ? data[data.length - 1]?.loss
              : data[data.length - 1]?.get
          ).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}{" "}
          ATF
        </Stack>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} syncId={"personal"}>
          {!props.simple && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={nowTheme.normal.border}
            />
          )}
          <XAxis
            dataKey="date"
            scale="auto"
            axisLine={false}
            hide={props.simple}
            tickLine={false}
            tick={{ fontSize: "10px" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            hide={props.simple}
            width={30}
            tickFormatter={(value, index) => {
              return numeral(value).format("0a").toUpperCase();
            }}
            tick={{ fontSize: "10px" }}
          />
          {!props.simple && <Tooltip content={<CustomTooltip />} />}
          <Bar
            dataKey="get"
            barSize={20}
            fill={nowTheme.normal.success}
            unit={" ATF"}
            minPointSize={1}
            stackId={"a"}
          />
          <Bar
            dataKey="loss"
            barSize={20}
            fill={nowTheme.normal.danger}
            unit={" ATF"}
            stackId={"a"}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  );
};

export default ReCharts;
