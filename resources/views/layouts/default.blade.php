<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ env('APP_NAME') }}</title>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap"
    >

    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <link rel="icon" type="image/png" href="/images/favicon.png">
</head>

<body>

@yield('content')

@stack('scripts')
</body>
</html>
