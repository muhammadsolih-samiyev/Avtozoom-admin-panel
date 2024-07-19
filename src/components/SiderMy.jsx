/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
function SiderMY({ children, setCheck }) {
  const myToken = localStorage.getItem("token");
  const [locationPath, setLocationPath] = useState("");
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (location.pathname == "/home") {
      setLocationPath("1");
    } else if (location.pathname == "/brands") {
      setLocationPath("2");
    } else if (location.pathname == "/cities") {
      setLocationPath("3");
    } else if (location.pathname == "/locations") {
      setLocationPath("4");
    } else if (location.pathname == "/cars") {
      setLocationPath("5");
    } else if (location.pathname == "/models") {
      setLocationPath("6");
    }
  }, []);

  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='text-white text-center mt-5 text-2xl font-bold pb-10'>
          <span
            className={`${
              !collapsed
                ? "logo1 bg-[#052D5C] "
                : "logo2 bg-[#254195b3] text-xl p-1 rounded-md"
            }   `}
          >
            AUTO
          </span>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={locationPath}
          items={[
            {
              key: "1",
              icon: (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  width={13}
                  height={22}
                >
                  <path d='M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6ZM7 11H13V13H7V11ZM7 15H13V17H7V15Z'></path>
                </svg>
              ),
              label: "Categories",
              onClick: () => {
                setLocationPath("1");
                navigate("/");
              },
            },
            {
              key: "2",
              icon: (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  width={13}
                  height={22}
                >
                  <path d='M12 6.99999C16.4183 6.99999 20 10.5817 20 15C20 19.4183 16.4183 23 12 23C7.58172 23 4 19.4183 4 15C4 10.5817 7.58172 6.99999 12 6.99999ZM12 8.99999C8.68629 8.99999 6 11.6863 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 11.6863 15.3137 8.99999 12 8.99999ZM12 10.5L13.3225 13.1797L16.2798 13.6094L14.1399 15.6953L14.645 18.6406L12 17.25L9.35497 18.6406L9.86012 15.6953L7.72025 13.6094L10.6775 13.1797L12 10.5ZM18 1.99999V4.99999L16.6366 6.13755C15.5305 5.5577 14.3025 5.17884 13.0011 5.04948L13 1.99899L18 1.99999ZM11 1.99899L10.9997 5.04939C9.6984 5.17863 8.47046 5.55735 7.36441 6.13703L6 4.99999V1.99999L11 1.99899Z'></path>
                </svg>
              ),
              label: "Brands",
              onClick: () => {
                setLocationPath("2");
                navigate("/brands");
              },
            },

            {
              key: "3",
              icon: (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  width={13}
                  height={22}
                >
                  <path d='M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H19V11H17V9H20C20.5523 9 21 9.44772 21 10V19ZM5 5V19H13V5H5ZM7 11H11V13H7V11ZM7 7H11V9H7V7Z'></path>
                </svg>
              ),
              label: "Cities",
              onClick: () => {
                setLocationPath("3");
                navigate("/cities");
              },
            },
            {
              key: "4",
              icon: (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  width={13}
                  height={22}
                >
                  <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z'></path>
                </svg>
              ),
              label: "Locations",
              onClick: () => {
                setLocationPath("4");
                navigate("/locations");
              },
            },
            {
              key: "5",
              icon: (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  width={13}
                  height={22}
                >
                  <path d='M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V13.5L0.757464 13.1894C0.312297 13.0781 0 12.6781 0 12.2192V11.5C0 11.2239 0.223858 11 0.5 11H2L4.4805 5.21216C4.79566 4.47679 5.51874 4 6.31879 4H17.6812C18.4813 4 19.2043 4.47679 19.5195 5.21216L22 11H23.5C23.7761 11 24 11.2239 24 11.5V12.2192C24 12.6781 23.6877 13.0781 23.2425 13.1894L22 13.5V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM20 18V13H4V18H20ZM5.47703 11H18.523C18.6502 11 18.7762 10.9757 18.8944 10.9285C19.4071 10.7234 19.6566 10.1414 19.4514 9.62861L18 6H6L4.54856 9.62861C4.50131 9.74673 4.47703 9.87278 4.47703 10C4.47703 10.5523 4.92475 11 5.47703 11ZM5 14C7.31672 14 8.87868 14.7548 9.68588 16.2643L9.68582 16.2643C9.81602 16.5078 9.72418 16.8107 9.4807 16.9409C9.40818 16.9797 9.3272 17 9.24496 17H6C5.44772 17 5 16.5523 5 16V14ZM19 14V16C19 16.5523 18.5523 17 18 17H14.755C14.6728 17 14.5918 16.9797 14.5193 16.9409C14.2758 16.8107 14.184 16.5078 14.3142 16.2643L14.3141 16.2643C15.1213 14.7548 16.6833 14 19 14Z'></path>
                </svg>
              ),
              label: "Cars",
              onClick: () => {
                setLocationPath("5");
                navigate("/cars");
              },
            },
            {
              key: "6",
              icon: (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  width={13}
                  height={22}
                >
                  <path d='M3.32308 12C3.32308 15.4385 5.32308 18.4 8.21538 19.8077L4.07692 8.46923C3.57998 9.57999 3.3231 10.7831 3.32308 12ZM12 20.6769C13.0077 20.6769 13.9769 20.5 14.8846 20.1846L14.8231 20.0692L12.1538 12.7615L9.55385 20.3231C10.3231 20.5538 11.1462 20.6769 12 20.6769ZM13.1923 7.93077L16.3308 17.2615L17.2 14.3692C17.5692 13.1692 17.8538 12.3077 17.8538 11.5615C17.8538 10.4846 17.4692 9.74615 17.1462 9.17692C16.7 8.45385 16.2923 7.84615 16.2923 7.13846C16.2923 6.33846 16.8923 5.6 17.7538 5.6H17.8615C16.2627 4.13224 14.1704 3.31946 12 3.32308C10.5629 3.32281 9.14834 3.67979 7.88347 4.3619C6.61861 5.04402 5.54315 6.02987 4.75385 7.23077L5.30769 7.24615C6.21538 7.24615 7.61539 7.13077 7.61539 7.13077C8.09231 7.10769 8.14615 7.79231 7.67692 7.84615C7.67692 7.84615 7.20769 7.90769 6.67692 7.93077L9.84615 17.3308L11.7462 11.6385L10.3923 7.93077C10.0891 7.91404 9.78636 7.88838 9.48462 7.85385C9.01538 7.82308 9.06923 7.10769 9.53846 7.13077C9.53846 7.13077 10.9692 7.24615 11.8231 7.24615C12.7308 7.24615 14.1308 7.13077 14.1308 7.13077C14.6 7.10769 14.6615 7.79231 14.1923 7.84615C14.1923 7.84615 13.7231 7.9 13.1923 7.93077ZM16.3615 19.5C17.6742 18.7368 18.7636 17.6424 19.5208 16.3263C20.2781 15.0102 20.6767 13.5184 20.6769 12C20.6769 10.4923 20.2923 9.07692 19.6154 7.83846C19.7529 9.20099 19.5466 10.5762 19.0154 11.8385L16.3615 19.5ZM12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22Z'></path>
                </svg>
              ),
              label: "Models",
              onClick: () => {
                setLocationPath("6");
                navigate("/models");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='flex items-center justify-between'
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type='text'
            icon={
              collapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            onClick={() => {
              setCheck(false);
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className='mr-5'
          >
            Logout
            <LogoutOutlined />
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100%",
            overflowY: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default SiderMY;