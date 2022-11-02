import "./globals.css";

type Data = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

type Weather = {
  id: number;
  main: string;
  description: string;
};

async function getData() {
  const res_geo = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=Prague&limit=1&appid=${process.env.NEXT_APP_OPENWEATHER_API}`
  );
  const geo = await res_geo.json().catch((e) => console.error(e));
  let lat: number = 0;
  let lon: number = 0;

  geo.map((data: Data) => {
    lat = data.lat;
    lon = data.lon;
  });
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_APP_OPENWEATHER_API}&units=metric`
  );
  return res.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();
  return (
    <html>
      <head></head>
      <body>
        <header>
          <nav className="m-3 ml-5 flex ">
            <ul className="flex">
              <div className="flex space-x-4 items-center justify-center">
                <p>{data.sys.country}</p>
                <p>{data.weather.description}</p>
                <p>{data.main.temp}</p>
                {data.weather.map((d: Weather) => (
                  <div key={d.id}>
                    <p>{d.description}</p>
                  </div>
                ))}
              </div>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
