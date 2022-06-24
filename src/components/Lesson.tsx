import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface LessonProps{
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {

    const { slug } = useParams<{ slug: string }>()
    const isLessonAvailable = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k':'mm",{
        locale: ptBR,
    })

    const activeLesson =  slug === props.slug

    return (
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div className={classNames ('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                'bg-green-500': activeLesson
            })}>
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (<span className={classNames("flex text-sm font-medium items-center gap-2", {
                        'text-white': activeLesson,
                        'text-blue-500': !activeLesson
                    })}>
                        <CheckCircle size={20} />
                        Conteúdo Liberado
                    </span>) : (
                        <span className="flex text-sm text-orange-500 font-medium items-center gap-2">
                        <Lock size={20} />
                        Em Breve
                    </span>
                    )}
                    <span className={classNames("text-xs rounded px-2 py-[0.125rem] text-white border  font-bold",{
                        'border-white': activeLesson,
                        'border-green-300': !activeLesson,
                    })}>
                        {props.type == 'live'? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className={classNames("block mt-5", {
                    'text-white': activeLesson,
                    'text-gray-200': !activeLesson,
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}