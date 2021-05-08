@extends('layouts.default')

@section('content')
    <div id="app"></div>
@endsection

@push('scripts')
    <script src="{{ asset('js/app.js') }}"></script>
@endpush
