<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ env('APP_NAME') }}</title>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">

    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>

<body>

@yield('content')

</body>
</html>
