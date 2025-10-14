'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { updateRecruitmentAction } from '@/actions/recruitment/updateRecruitment';
import upperFirst from 'lodash/upperFirst';

interface RecruitmentData {
    id: number;
    playerClass: string;
    recruiting: boolean;
}

interface RecruitmentActionsProps {
    recruitment: RecruitmentData[];
}

export default function RecruitmentActions({
    recruitment,
}: RecruitmentActionsProps) {
    const [playerClasses, setPlayerClasses] =
        useState<RecruitmentData[]>(recruitment);

    const { execute: updateRecruitment } = useAction(updateRecruitmentAction, {
        onSuccess: ({ data }) => {
            if (data?.success) {
                const updatedClasses = playerClasses.map((player) => {
                    if (player.id === data.recruitment.id) {
                        return data.recruitment;
                    }
                    return player;
                });
                setPlayerClasses(updatedClasses);
            }
        },
    });

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        const target = ev.target as HTMLButtonElement;
        const { name, disabled } = target;
        const type = target.getAttribute('data-type');
        const recruiting = type === 'open' ? !disabled : disabled;

        const recruitmentData = playerClasses.find(
            (p) => p.playerClass === name,
        );
        if (recruitmentData) {
            updateRecruitment({
                id: recruitmentData.id,
                playerClass: name,
                recruiting,
            });
        }
    };

    return (
        <div className="recruitment-grid">
            {playerClasses.map((player) => {
                return (
                    <div key={player.id} className="recruitment-item">
                        <div className="recruitment-class">
                            {upperFirst(player.playerClass)}
                        </div>
                        <div className="recruitment-buttons">
                            <button
                                name={player.playerClass}
                                data-type="open"
                                disabled={player.recruiting}
                                onClick={handleClick}
                                className={`recruitment-btn ${
                                    player.recruiting
                                        ? 'recruiting'
                                        : 'not-recruiting'
                                }`}
                            >
                                {player.recruiting
                                    ? 'Recruiting'
                                    : 'Not Recruiting'}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
