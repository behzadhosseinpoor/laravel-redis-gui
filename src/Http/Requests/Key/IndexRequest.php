<?php

namespace Laravel\RedisGUI\Http\Requests\Key;

use Illuminate\Foundation\Http\FormRequest;

class IndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => 'bail|nullable|numeric|min:0|max:6',
            'query' => 'bail|nullable|string|max:150',
            'view' => 'bail|nullable|string',
        ];
    }
}
