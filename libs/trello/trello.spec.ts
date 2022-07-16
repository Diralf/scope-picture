{
    /**
     * TrelloPowerUp.version should be string
     */
    window.TrelloPowerUp.version = '123';
    //@ts-expect-error
    window.TrelloPowerUp.version = 12;
}
