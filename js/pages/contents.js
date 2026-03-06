export function renderContentsPage() {
    return `
        <h1 class="section-title">콘텐츠</h1>

        <div class="contents-section">
            <h2>게임 모드</h2>
            <p>MineOfDuty는 마인크래프트 위에서 구현된 본격 FPS 서버입니다. 다양한 게임 모드를 통해 전략적이고 박진감 넘치는 전투를 즐길 수 있습니다.</p>
            <p>섬멸전, 쟁탈전, 습격전 등 클래식 FPS 모드들을 마인크래프트에서 경험해보세요.</p>
        </div>

        <div class="contents-section">
            <h2>전투 시스템</h2>
            <p>주무장, 보조무장, 수류탄 등 FPS 게임의 핵심 요소가 모두 구현되어 있습니다.</p>
        </div>

        <div class="contents-section">
            <h2>커스텀 필드</h2>
            <p>다양한 테마와 크기의 전장에서 전투를 벌이세요. 각 필드는 전략적 포인트와 엄폐물이 배치되어 있어 팀워크와 개인 실력 모두 중요합니다.</p>
        </div>

        <div class="contents-section">
            <h2>탈것</h2>
            <p>전차, 헬기 등 다양한 탈것을 조종할 수 있습니다. 탈것은 팀 전투에서 강력한 화력 지원을 제공하며, 팀원과의 협동 운용이 핵심입니다.</p>
        </div>

        <div style="margin-top: 32px;">
            <h2 class="section-title">더 알아보기</h2>
            <div class="feature-grid">
                <a href="#/archive?category=weapons" class="feature-card">
                    <div class="feature-card-icon">&#x1F52B;</div>
                    <div class="feature-card-title">총기 목록</div>
                    <div class="feature-card-desc">서버에 있는 모든 총기를 확인해보세요.</div>
                </a>
                <a href="#/archive?category=fields" class="feature-card">
                    <div class="feature-card-icon">&#x1F5FA;</div>
                    <div class="feature-card-title">필드 목록</div>
                    <div class="feature-card-desc">전투가 벌어지는 필드를 둘러보세요.</div>
                </a>
                <a href="#/archive?category=vehicles" class="feature-card">
                    <div class="feature-card-icon">&#x1F69B;</div>
                    <div class="feature-card-title">탈것 목록</div>
                    <div class="feature-card-desc">조종 가능한 탈것을 확인해보세요.</div>
                </a>
            </div>
        </div>
    `;
}
