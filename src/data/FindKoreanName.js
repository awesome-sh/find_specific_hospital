export const FindKoreanName = ( searchCode ) => {
    let result = '존재하지 않는 코드입니다.';

    switch( searchCode ) {
        case 'hemodialysis': {
            result = '혈액투석'
            break;
        }
        case 'extracorporeal_shockwave_lithotripsy': {
            result = '체외충격파쇄석술'
            break;
        }
        case 'cross_eye': {
            result = '사시수술'
            break;
        }
        case 'cochlear_implant': {
            result = '인공와우이식술'
            break;
        }
        case 'temporomandibular_joint': {
            result = '측두하악관절 자극요법'
            break;
        }
        case 'artificial_pacemaker_transplant': {
            result = '인공심박동기이식술'
            break;
        }
        case 'arrhythmic_radiofrequency_ablation': {
            result ='부정맥고주파절제술'
            break;
        }
        case 'cardioversion_defibrillator_placement': {
            result ='심율동전환제세동기거치술'
            break;
        }
        case 'splicing': {
            result ='손·발가락 접합술'
            break;
        }
        case 'retinal_surgery': {
            result ='망막수술'
            break;
        }
        case 'burn_treatment': {
            result ='화상치료'
            break;
        }
        case 'post_caesarean_delivery_hospital': {
            result = '제왕절개후자연분만병원'
            break;
        }
        case 'varicose_vein_surgery': {
            result = '정맥류수술'
            break;
        }
        case 'cleft_palate': {
            result = '구순구개열'
            break;
        }
        case 'orbital_fracture_reduction_surgery': {
            result = '안와골절정복술'
            break;
        }
        // 이식술
        case 'corneal': {
            result = '각막이식술'
            break;
        }
        case 'liver': {
            result = '간이식술'
            break;
        }
        case 'kidney': {
            result = '신장이식술'
            break;
        }
        case 'heart': {
            result = '심장이식술'
            break;
        }
        case 'lung': {
            result = '폐이식술'
            break;
        }
        case 'sclera': {
            result = '공막이식술'
            break;
        }
        case 'marrow': {
            result = '골수이식술'
            break;
        }
        default: {
            break;
        }
    }

    return result;
}