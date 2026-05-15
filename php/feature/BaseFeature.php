<?php
declare(strict_types=1);

// KanjiData SDK base feature

class KanjiDataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(KanjiDataContext $ctx, array $options): void {}
    public function PostConstruct(KanjiDataContext $ctx): void {}
    public function PostConstructEntity(KanjiDataContext $ctx): void {}
    public function SetData(KanjiDataContext $ctx): void {}
    public function GetData(KanjiDataContext $ctx): void {}
    public function GetMatch(KanjiDataContext $ctx): void {}
    public function SetMatch(KanjiDataContext $ctx): void {}
    public function PrePoint(KanjiDataContext $ctx): void {}
    public function PreSpec(KanjiDataContext $ctx): void {}
    public function PreRequest(KanjiDataContext $ctx): void {}
    public function PreResponse(KanjiDataContext $ctx): void {}
    public function PreResult(KanjiDataContext $ctx): void {}
    public function PreDone(KanjiDataContext $ctx): void {}
    public function PreUnexpected(KanjiDataContext $ctx): void {}
}
