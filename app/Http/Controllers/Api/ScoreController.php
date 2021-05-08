<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ScoreResource;
use App\Models\Score;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller
{
    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $user = Auth::user();

        return ScoreResource::collection($user->scores);
    }

    /**
     * @param  Score  $score
     * @return ScoreResource
     */
    public function show(Score $score)
    {
        return new ScoreResource($score);
    }

    /**
     * @param  Request  $request
     * @param  Authenticatable  $user
     * @return \Illuminate\Http\JsonResponse|object
     */
    public function store(Request $request, Authenticatable $user)
    {
        $validated = $request->validate([
            'hash'    => 'required|string|unique:scores,hash',
            'title'   => 'required|string',
            'content' => 'string',
        ]);

        $score = new Score($validated);
        $score->user_id = $user->id;
        $score->save();

        return ($this->show($score))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * @param  Request  $request
     * @param  Score  $score
     * @return ScoreResource
     */
    public function update(Request $request, Score $score)
    {
        $validated = $request->validate([
            'title'   => 'string',
            'content' => 'string',
        ]);

        $score->fill($validated);
        $score->save();

        return $this->show($score);
    }
}
