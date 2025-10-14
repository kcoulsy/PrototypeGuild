'use client';

import React, { useState, useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
    getRecruitmentAction,
    updateRecruitmentAction,
} from '@/lib/actions/recruitment';
import upperFirst from 'lodash/upperFirst';
import Panel from '../Panel';

interface RecruitmentData {
    id: number;
    playerClass: string;
    recruiting: boolean;
}

interface RecruitmentProps {
    recruitment?: RecruitmentData[];
    onRecruitmentUpdate?: () => void;
}

export default function Recruitment({
    recruitment: initialRecruitment,
    onRecruitmentUpdate,
}: RecruitmentProps) {
    const [playerClasses, setPlayerClasses] = useState<RecruitmentData[]>(
        initialRecruitment || []
    );

    const fetchRecruitment = async () => {
        try {
            const result = await getRecruitmentAction();
            if (result.success) {
                setPlayerClasses(result.recruitment);
            }
        } catch (error) {
            console.error('Error fetching recruitment data:', error);
        }
    };

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
                if (onRecruitmentUpdate) {
                    onRecruitmentUpdate();
                }
            }
        },
    });

    useEffect(() => {
        if (!initialRecruitment) {
            fetchRecruitment();
        }
    }, [initialRecruitment]);

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        const target = ev.target as HTMLButtonElement;
        const { name, disabled } = target;
        const type = target.getAttribute('data-type');
        const recruiting = type === 'open' ? !disabled : disabled;

        const recruitmentData = playerClasses.find(
            (p) => p.playerClass === name
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
        <Panel title="Recruitment" styleName="">
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
        </Panel>
    );
}
