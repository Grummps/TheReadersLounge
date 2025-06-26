export default ({ markup }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta
      name="viewport"
      content="initial-scale=1, width=device-width"
    >
    <title>BookClub</title>

    <!-- 1) Static Tailwind stylesheet -->
    <link
      rel="stylesheet"
      href="/dist/tailwind.css"
    >
  </head>

  <!-- 2) You can add global utility classes here (e.g. antialiased) -->
  <body class="antialiased">
    <!-- 3) React’s SSR markup goes here -->
    <div id="root">${markup}</div>

    <!-- 4) Client bundle hydrates above markup -->
    <script src="/dist/bundle.js"></script>
  </body>
</html>
`
