<?php

namespace Laravel\RedisGUI\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class RedisGUIException extends HttpException
{
    private $statusCode;

    public function __construct($statusCode = 500, string $message = null)
    {
        $this->statusCode = intval($statusCode);

        parent::__construct($this->statusCode, $message);
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function report(): bool
    {
        return false;
    }
}